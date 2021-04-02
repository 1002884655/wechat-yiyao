
export default function observe() {
  const listeners = []

  function notify(...args) {
    listeners.forEach(listener => listener(...args))
  }

  function subscribe (listener) {
    listeners.push(listener)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  return {
    notify,
    subscribe
  }
}
