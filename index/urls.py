from django.urls import path
from index import views

app_name = 'musicapp'

urlpatterns = [
    path('',views.index, name='index'),
    path('browse/',views.browse, name='browse'),

    path('artist/',views.artist, name='artist'), 
    path('artist/<str:uuid>/',views.artist_detail, name='artist_detail'),

    path('album/',views.album, name='album'),
    path('album/<str:uuid>/',views.album_detail, name='album_detail'),

    path('song/<str:uuid>/',views.song, name='song'),
    path('compare/<str:uuid>/',views.compare, name='compare'),
    path('api/search/', views.search_autocomplete, name='search_autocomplete'),
]