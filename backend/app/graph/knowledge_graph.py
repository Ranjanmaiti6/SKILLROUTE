"""
SkillRoute Knowledge Graph Service
Abstracts skill-to-occupation graph queries.
Structured to allow drop-in migration to Neo4j in production.
"""
import json
import os
from typing import Dict, Any, List

class TransitionGraphService:
    def __init__(self, data_path: str = None):
        if not data_path:
            # Look up standard path relative to repository
            current_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.abspath(os.path.join(current_dir, "../../../data/occupations/transition_graph.json"))
        
        self.data_path = data_path
        self._graph_data = None
        self._load_graph()

    def _load_graph(self):
        try:
            with open(self.data_path, "r", encoding="utf-8") as f:
                self._graph_data = json.load(f)
        except Exception:
            # Fallback inline graph structure
            self._graph_data = {
                "nodes": [],
                "edges": []
            }

    def get_full_graph(self) -> Dict[str, Any]:
        return self._graph_data

    def get_nodes_by_type(self, node_type: str) -> List[Dict[str, Any]]:
        return [n for n in self._graph_data.get("nodes", []) if n.get("type") == node_type]

    def get_node_by_id(self, node_id: str) -> Dict[str, Any]:
        for n in self._graph_data.get("nodes", []):
            if n.get("id") == node_id:
                return n
        return {}
