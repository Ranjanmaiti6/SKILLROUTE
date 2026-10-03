import json
import os
from typing import Dict, Any
from fastapi import APIRouter, HTTPException
from app.graph.knowledge_graph import TransitionGraphService
from app.intelligence.explainability import PathwayExplainer

router = APIRouter(prefix="/transitions", tags=["Transitions"])
graph_service = TransitionGraphService()

@router.get("/{role_slug}")
def get_transition_details(role_slug: str) -> Dict[str, Any]:
    """
    Returns combined transition details (graph and why-this-path explanation).
    """
    graph_data = graph_service.get_full_graph()
    why_data = PathwayExplainer.explain_transition(role_slug)
    return {
        "role_slug": role_slug,
        "graph": graph_data,
        "why": why_data
    }

@router.get("/{role_slug}/graph")
def get_transition_graph(role_slug: str) -> Dict[str, Any]:
    """
    Returns nodes and edges for the signature Transition Graph visualization.
    """
    graph_data = graph_service.get_full_graph()
    return graph_data

@router.get("/{role_slug}/why")
def get_why_this_path(role_slug: str) -> Dict[str, Any]:
    """
    Returns structured evidence-backed rationale for the selected transition.
    """
    explanation = PathwayExplainer.explain_transition(role_slug)
    return explanation
