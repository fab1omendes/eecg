from django.db import models

class ECG(models.Model):
    patient_name = models.CharField(max_length=255)
    exam_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='ecg/')
    result = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.patient_name