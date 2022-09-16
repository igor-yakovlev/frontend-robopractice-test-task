export const fetchData = async () => {
  const response = await fetch(`${window.location.origin}/api/users`, {method: 'GET' })
    .then(res => res.json());
  return response
}
