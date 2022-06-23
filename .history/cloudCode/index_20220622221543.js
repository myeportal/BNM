Moralis.Cloud.beforeSave("SoldItems", async (request) => {
    const query = new Moralis.Query("ItemsForSale");
    query.equalTo("uid", request.object.get("uid"));
    const item = await query.first();
    if (item) {
        request.object.set("item", item);
        item.set("isSold", true);
        await item.save();

        const userQuery = new Moralis.Query(Moralis.User);
        userQuery.equalTo("accounts", request.object.get("buyer"));
        const userObject = await userQuery.first({ useMasterKey: true });
        if (userObject) {
            request.object.set("user", userObject);
        }
    }
});
