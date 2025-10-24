from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Q
from musicapp.models import Artist, Album, Song, SongArtist, SongSampleRelation

def index(request):
    """메인페이지"""
    return render(request, 'index.html')

def search_autocomplete(request):
    """실시간 검색 API"""
    query = request.GET.get('q', '').strip()
    
    # if not query or len(query) < 2: # 두 글자 이상부터 검색 가능
    if not query or len(query.strip()) < 1: # 한 글자 이상부터 검색 가능
        return JsonResponse({'results': []})
    
    # 아티스트 검색
    artists = Artist.objects.filter(
        Q(artist_name__icontains=query) |
        Q(artist_kname__icontains=query)
    ).values('id', 'artist_name', 'artist_kname', 'artist_uuid')[:5]
    
    # 앨범 검색
    albums = Album.objects.filter(
        Q(album_title__icontains=query)
    ).select_related('album_artist').values(
        'id', 'album_title', 'album_artist__artist_name', 'album_uuid'
    )[:5]
    
    # 곡 검색
    songs = Song.objects.filter(
        Q(song_title__icontains=query)
    ).select_related('song_album__album_artist').values(
        'id', 'song_title', 'song_album__album_title', 'song_album__album_artist__artist_name', 'song_uuid'
    )[:5]
    
    # 결과 포맷팅
    results = {
        'artists': [
            {
                'id': artist['id'],
                'name': artist['artist_name'],
                'kname': artist['artist_kname'],
                'uuid': artist['artist_uuid'],
                'type': 'artist'
            }
            for artist in artists
        ],
        'albums': [
            {
                'id': album['id'],
                'title': album['album_title'],
                'artist': album['album_artist__artist_name'],
                'uuid': album['album_uuid'],
                'type': 'album'
            }
            for album in albums
        ],
        'songs': [
            {
                'id': song['id'],
                'title': song['song_title'],
                'album': song['song_album__album_title'],
                'artist': song['song_album__album_artist__artist_name'],
                'uuid': song['song_uuid'],
                'type': 'song'
            }
            for song in songs
        ]
    }
    
    return JsonResponse(results)

def browse(request):
    """둘러보기 페이지"""
    return render(request, 'browse.html')

# Artist
def artist(request):
    """아티스트 전체 페이지"""
    artist_list = Artist.objects.all()
    return render(request, 'artist.html',context=dict(artist_list=artist_list))
    
def artist_detail(request, uuid):
    """아티스트 디테일 페이지"""
    artist_info = Artist.objects.get(artist_uuid = uuid)
    album_info = Album.objects.filter(album_artist_id = artist_info.id)
    album_type_info = album_info.values('album_type').order_by('album_type').distinct()
    song_info = artist_info.songartist_set.all()

    main_songs_info = song_info.filter(role='main')
    feat_songs_info = song_info.exclude(role='main')

    # 샘플링 된 곡 정보
    sampled_info = SongSampleRelation.objects.filter(
        original_song__songartist__artist=artist_info
    ).select_related(
        'sampling_song', 'sampling_song__song_album__album_artist'
    ).distinct()

    context = {
        'artist':artist_info,
        'album': album_info,
        'albumtype': album_type_info,
        'song' : song_info,
        'sampled' : sampled_info,
        'main_songs' : main_songs_info,
        'feat_songs' : feat_songs_info,
    }

    return render(request, 'artist_detail.html', context)

# Album
def album(request):
    """앨범 전체 페이지"""
    album_list = Album.objects.all()
    return render(request, 'album.html',context=dict(album_list=album_list))
    
def album_detail(request, uuid):
    """앨범 디테일 페이지"""
    album_info = Album.objects.get(album_uuid=uuid)
    song_info = Song.objects.filter(song_album_id=album_info.id).prefetch_related('song_artists')

    context = {
        'album': album_info,
        'song_info' : song_info,
    }
    return render(request, 'album_detail.html',context)

# Song
def song(request, uuid):
    """곡 정보페이지"""
    song_info = Song.objects.get(song_uuid=uuid)
    song_main_artist = SongArtist.objects.get(song_id=song_info.id, role='main')
    
    # 샘플링 된 곡 정보
    sampled_info = SongSampleRelation.objects.filter(
        original_song=song_info
    )
    # 샘플링 한 곡 정보
    sampling_info = SongSampleRelation.objects.filter(
        sampling_song=song_info
    )

    context = {
        'song' : song_info,
        'sampled' : sampled_info,
        'sampling' : sampling_info,
        'songMainArtist' : song_main_artist,
    }

    if SongArtist.objects.filter(song_id=song_info.id, role='feat').exists():
        song_feat_artist = SongArtist.objects.filter(song_id=song_info.id, role='feat')
        context['songFeatArtist'] = song_feat_artist

    return render(request, 'song_detail.html',context)

def compare(request, uuid):
    """곡 정보 + 샘플 정보 페이지"""
    song_info = Song.objects.get(song_uuid=uuid) # 결과가 단일일때 get사용, 여러개 일때 filter(조건) 이런식으로 사용
    song_main_artist = SongArtist.objects.get(song_id=song_info.id, role='main')
    sample_info = SongSampleRelation.objects.get(sampling_song=song_info.id)
    sample_main_artist = SongArtist.objects.get(song_id=sample_info.original_song.id)
    sampling_song_timestamp = sample_info.sampling_song_timestamp.split(',')
    original_song_timestamp = sample_info.original_song_timestamp.split(',')

    context = {
        'song' : song_info,
        'sample' : sample_info,
        'songMainArtist' : song_main_artist,
        'sampleMainArtist' : sample_main_artist,
        'sampling_song_timestamp' : sampling_song_timestamp,
        'original_song_timestamp' : original_song_timestamp,
    }

    if SongArtist.objects.filter(song_id=song_info.id, role='feat').exists():
        song_feat_artist = SongArtist.objects.filter(song_id=song_info.id, role='feat')
        context['songFeatArtist'] = song_feat_artist
    return render(request, 'compare.html',context)