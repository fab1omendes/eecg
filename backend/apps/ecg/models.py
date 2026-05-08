from django.db import models
from django.conf import settings

class ECG(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    patient_name = models.CharField(max_length=255)
    exam_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='ecg/')
    result = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient_name} - {self.exam_date.strftime('%d/%m/%Y')}"

class CardioFluxAnalysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    patient_name = models.CharField(max_length=255)
    exam_date = models.DateTimeField()
    file_path = models.CharField(max_length=500, blank=True, null=True)
    
    # Detailed Metrics
    classification = models.CharField(max_length=255, blank=True, null=True)
    st_status = models.CharField(max_length=100, blank=True, null=True)
    st_elevation = models.FloatField(null=True, blank=True)
    sd1 = models.FloatField(null=True, blank=True)
    sd2 = models.FloatField(null=True, blank=True)
    ratio = models.FloatField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    
    result = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CardioFlux: {self.patient_name} - {self.exam_date}"