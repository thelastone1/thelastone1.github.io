from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver
from .models import Artist, Song, SongArtist

# @receiver(post_save, sender=SongArtist)
# def update_artist_sample_count_on_create(sender, instance, created, **kwargs):
#     """SongArtist가 생성되거나 수정될 때"""
#     if instance.artist:
#         # 이 아티스트가 참여한 곡 수 카운트
#         count = SongArtist.objects.filter(artist=instance.artist).count()
#         instance.artist.sample_count = count
#         instance.artist.save(update_fields=['sample_count'])

# @receiver(post_delete, sender=SongArtist)
# def update_artist_sample_count_on_delete(sender, instance, **kwargs):
#     """SongArtist가 삭제될 때"""
#     if instance.artist:
#         # 이 아티스트가 참여한 곡 수 카운트
#         count = SongArtist.objects.filter(artist=instance.artist).count()
#         instance.artist.sample_count = count
#         instance.artist.save(update_fields=['sample_count'])

def update_artist_sample_count(artist):
    """Artist의 sample_count 업데이트"""
    count = SongArtist.objects.filter(artist=artist).count()
    artist.sample_count = count
    artist.save(update_fields=['sample_count'])

def update_album_sample_count(album):
    """Album의 album_sample_count 업데이트"""
    # 이 앨범에 속한 Song이 몇 개인지 계산
    count = Song.objects.filter(song_album=album).count()
    album.album_sample_count = count
    album.save(update_fields=['album_sample_count'])

@receiver(post_save, sender=SongArtist)
def update_counts_on_create_or_update(sender, instance, created, **kwargs):
    """SongArtist 생성·수정 시 Artist / Album 모두 업데이트"""
    if instance.artist:
        update_artist_sample_count(instance.artist)

    if instance.song and instance.song.song_album:
        update_album_sample_count(instance.song.song_album)

@receiver(post_delete, sender=SongArtist)
def update_counts_on_delete(sender, instance, **kwargs):
    """SongArtist 삭제 시 Artist / Album 모두 업데이트"""
    if instance.artist:
        update_artist_sample_count(instance.artist)

    if instance.song and instance.song.song_album:
        update_album_sample_count(instance.song.song_album)