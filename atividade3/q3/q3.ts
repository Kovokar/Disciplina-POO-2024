function formatNumber(nuns: number[]): void {
    let str: string = ''

    nuns.forEach((element) => str = str + `${element}-`)
    console.log(str.slice(0,-1))
}

formatNumber([1,2,3,4])