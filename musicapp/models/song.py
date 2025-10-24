from django.db import models
from .artist import Artist
from .album import Album
import uuid

class Song(models.Model):
    song_title = models.CharField(max_length=100)
    song_album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='song_album')
    song_producer = models.CharField(max_length=50, blank=True, null=True)
    song_timestamp = models.CharField(max_length=20, blank=True, default="00:00")
    song_link = models.CharField(max_length=100, blank=True, null=True)
    sample_contributor = models.CharField(max_length=20, blank=True, null=True)
    song_artists = models.ManyToManyField(Artist, through='SongArtist', related_name = 'songs')
    song_uuid = models.UUIDField(default=uuid.uuid4, unique=True, null=False, blank=True)

    class Meta:
        ordering = ['id']
        app_label = 'musicapp'

    def __str__(self):
        return self.song_title

class SongArtist(models.Model):
    """곡-아티스트 중간 테이블 (역할 포함)"""
    ROLE_CHOICES = [
        ('main', '메인'),
        ('feat', '피처링'),
        ('prod', '프로듀서'),
    ]
    
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='main')
    order = models.IntegerField(default=0, help_text="Role에 따른 순서")
    
    class Meta:
        # ordering = ['order'] # order로 인해서 main아티스트가 first로 리턴
        unique_together = ['song', 'artist', 'role']
        app_label = 'musicapp'
        verbose_name = '곡 아티스트'
        verbose_name_plural = '곡 아티스트'
    
    def __str__(self):
        # return f"{self.song.song_title} - {self.artist.artist_name} ({self.get_role_display()})"
        return f"{self.artist.artist_name}"
    

class SongSampleRelation(models.Model):
    """곡 간 샘플링 관계 정의"""
    
    # 원곡
    original_song = models.ForeignKey(Song, related_name="original_song", on_delete=models.CASCADE, null=True)
    original_song_timestamp = models.CharField(max_length=20, blank=True, default="00:00")
    
    #샘플링 한 곡
    sampling_song = models.ForeignKey(Song, related_name="sampling_song", on_delete=models.CASCADE, null=True)
    sampling_song_timestamp = models.CharField(max_length=20, blank=True, default="00:00")

    relation_type = models.CharField(   # 예: "drum", "vocal", "melody" 등
        max_length=50,
        choices=[
            ('melody', 'Melody'),
            ('drum', 'Drum'),
            ('vocal', 'Vocal'),
            ('other', 'Other'),
        ],
        default='melody',
        help_text="샘플 유형"
    )

    class Meta:
        unique_together = ('original_song', 'sampling_song')

    def __str__(self):
        return f"'{self.sampling_song}'의 원곡 - {self.original_song}"