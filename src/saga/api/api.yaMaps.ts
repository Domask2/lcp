
export const ApiYaMaps = {
    geocode(apiKey: string, values: string): any {

        return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${values}&format=json`)
            .then(res => res.json())
            .then(
                (result) => result,
                (error) => {
                    console.log(error);
                }
            )
    },
}