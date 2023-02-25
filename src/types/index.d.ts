type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Login = {
  username: string
  password: string
  remember: boolean
}