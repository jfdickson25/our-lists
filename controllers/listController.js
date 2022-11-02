exports.getItemIndex = async (list, categoryIndex, name) => {
    // Find the index of the item in the items array
    let itemIndex = await list.categories[categoryIndex].items.findIndex(item => {
        return item.name === name;
    });

    return itemIndex;
}

exports.getCategoryIndex = async (list, categoryName) => {
    // Find the index of the categories
    let categoryIndex = await list.categories.findIndex(category => {
        return category.name === categoryName;
    });

    return categoryIndex;
}