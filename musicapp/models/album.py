from django.db import models
from .artist import Artist
import uuid
from django.utils.text import slugify

class Album(models.Model):
    ALBUM_TYPE = [
        ('album', '앨범'),
        ('ep', 'EP'),
        ('single', '싱글'),
    ]

    def album_image_path(instance, filename):
        # 한글은 변환 안되고 공백으로 저장됨.
        safe_name = slugify(instance.album_title)
        unique_suffix = uuid.uuid4().hex[:8]
        ext = filename.split('.')[-1] # 업로드한 파일의 확장자
        return f"static/img/album_images/{safe_name}_{unique_suffix}.{ext}"

    album_title = models.CharField(max_length=50)
    album_artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album_type = models.CharField(max_length=10, default='album', choices=ALBUM_TYPE)
    album_release_date = models.DateField(default='2000-01-01')
    album_sample_count = models.IntegerField(blank=True, null=True)
    album_uuid = models.UUIDField(default=uuid.uuid4, unique=True, null=False, blank=True)
    album_image = models.ImageField(upload_to=album_image_path,blank=True, null=True)

    class Meta:
        ordering = ['album_release_date']
        app_label = 'musicapp'

    def __str__(self):
        return self.album_title