export const fetchData = async () => {
  const response = await fetch('/api/users', {method: 'GET' })
    .then(res => res.json());
  return response
}
