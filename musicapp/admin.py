from django.contrib import admin
from .models import Album, Artist, Song, SongArtist, SongSampleRelation

# Register your models here.
# Artist Admin
@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['artist_name', 'artist_kname', 'artist_group', 'artist_member', 'sample_count', 'artist_uuid']
    search_fields = ['artist_name', 'artist_kname', 'artist_uuid']
    list_filter = ['artist_group']

# Album Admin
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['album_title', 'album_artist', 'album_release_date', 'album_type', 'album_uuid']
    list_filter = ['album_type', 'album_artist', 'album_uuid']
    search_fields = ['album_title']

# SongArtist Inline (Song 안에서 아티스트 추가)
class SongArtistInline(admin.TabularInline):
    model = SongArtist
    extra = 1
    fields = ['artist', 'role', 'order']
    autocomplete_fields = ['artist']

# SongSample Inline (Song안에서 샘플 관계)
class SongSampleRelationInline(admin.TabularInline):
    model = SongSampleRelation
    extra = 0
    fields = ['relation_type', 'original_song', 'sampling_song']
    fk_name = 'sampling_song'

# Song Admin
@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ['song_title', 'song_album', 'get_artists', 'song_timestamp', 'song_uuid']
    list_filter = ['song_album__album_artist']
    search_fields = ['song_title', 'song_uuid']
    inlines = [
        SongArtistInline,
        SongSampleRelationInline,
    ]
    
    def get_artists(self, obj):
        return ', '.join([sa.artist.artist_name for sa in obj.songartist_set.all()])
    get_artists.short_description = '아티스트'