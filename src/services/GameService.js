


export default class GameService {

    baseApi = 'https://starnavi-frontend-test-task.herokuapp.com';

    getResource = async (url) => {
      const res = await fetch(`${this.baseApi}${url}`)

      if (!res.ok) {
        throw new Error(`Could not fetch ${this.baseApi}${url}, received ${res.status}`)
      }
      return await res.json()
    };

    setResources = async (url, data) => {
      const res = await fetch(`${this.baseApi}${url}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.baseApi}${url}, received ${res.status}`)
      }
      return await res.json()
    };

    getGameSetting = async () => {
      const res = await this.getResource(`/game-settings`)
      return res
    };

    setGameWinners = async (data) => {
      const res = await this.setResources(`/winners`, data)
      return res
    }

    getGameWinners = async () => {
      const res = await this.getResource(`/winners`)
      return res
    };
}