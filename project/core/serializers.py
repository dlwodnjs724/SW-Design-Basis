from rest_framework import serializers

from accounts.serializers import UserSerializer
from core.models import Score


class ScoreSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Score
        fields = '__all__'
