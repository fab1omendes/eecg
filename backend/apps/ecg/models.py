from django.db import models
from django.conf import settings

class ECG(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    patient_name = models.CharField(max_length=255)
    exam_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='ecg/')
    result = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.patient_name