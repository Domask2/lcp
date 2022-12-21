export const setRandomKey = (newCmp: any, page_key: any) => {
    newCmp.key = newCmp.type + '_' + Math.floor(Math.random() * 1000000);
    newCmp.page_key = page_key

    newCmp.children?.forEach((item: any) => {
        item.key = item.type + '_' + Math.floor(Math.random() * 1000000);
        item.page_key = page_key

        item.children?.forEach((child_item: any) => {
            setRandomKey(child_item, page_key)
        })
    })
}