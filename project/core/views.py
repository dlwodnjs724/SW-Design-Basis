from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from core.models import Score
from core.serializers import ScoreSerializer


def main(request):
    score_list = Score.objects.select_related('user').order_by('-point', 'created_at')[:5]
    return render(request, 'core/main.html', {
        'score_list': score_list
    })


class ScoreAPIView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ScoreSerializer
    queryset = Score.objects.select_related('user').order_by('-point', 'created_at')[:5]

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(instance=self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@csrf_exempt
def score_create(request):
    if not request.user.is_authenticated:
        return JsonResponse({"result": False}, status=200)
    data = {
        'user': request.user,
        'point': request.POST.get('score')
    }
    score = Score.objects.create(**data)
    return JsonResponse({
        "result": True,
        "score": score.point,
    }, status=201)
