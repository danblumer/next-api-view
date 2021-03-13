const url = process.env.NEXT_PUBLIC_API_URL;
export async function loadAllMessages() {
  const response = await fetch("http://localhost:3000/api" + "/messages/");
  let apiData = await response.json();
  return apiData;
}

export async function updateMessageStatus(messageId, read) {
  const body = { read: read };
  const response = await fetch(`${url}/message/${messageId}`, {
    method: "put",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(body),
  });
}
