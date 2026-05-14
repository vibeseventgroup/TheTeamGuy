const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function getHomepageOptions() {
  const res = await fetch(`${API_BASE}/api/homepage/options`);
  if (!res.ok) throw new Error('Failed to load homepage options');
  const data = await res.json();
  return Array.isArray(data) ? data : data.options || [];
}
