from django.db import models
from django.contrib.auth.models import User  # Assuming you have user authentication


class RoomInspire(models.Model):
    image = models.ImageField(upload_to='roomInspireImages')

    class Meta:
        db_table = 'design'
        verbose_name = 'Design'
        verbose_name_plural = "Designs"