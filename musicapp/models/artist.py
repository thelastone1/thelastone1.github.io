from django.db import models
import uuid
from django.utils.text import slugify

class Artist(models.Model):

    def artist_image_path(instance, filename):
        # 한글은 변환 안되고 공백으로 저장됨.
        safe_name = slugify(instance.artist_name)
        unique_suffix = uuid.uuid4().hex[:8]
        ext = filename.split('.')[-1] # 업로드한 파일의 확장자
        return f"static/img/artist_images/{safe_name}_{unique_suffix}.{ext}"

    artist_name = models.CharField(max_length=100)
    artist_kname = models.CharField(max_length=50, blank=True, null=True)
    artist_group = models.CharField(max_length=50, blank=True, null=True)
    artist_member = models.CharField(max_length=50, blank=True, null=True)
    sample_count = models.IntegerField(blank=True, null=True)
    sampled_count = models.IntegerField(blank=True, null=True)
    artist_uuid = models.UUIDField(default=uuid.uuid4, unique=True, null=False, blank=True)
    artist_image = models.ImageField(upload_to=artist_image_path, blank=True, null=True)

    class Meta:
        ordering  =  ['artist_name', 'artist_kname']
        app_label = 'musicapp'

    def __str__(self):
        return self.artist_name