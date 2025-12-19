import client from "../../../../lib/mongodb";
export async function GET() {
    try {
        await client.connect();
        const db = client.db("savedContacts");

        const total = await db
            .collection("contacts")
            .countDocuments();

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0,0,0,0)

        const recentlyAdded = await db.collection("contacts").countDocuments({
            date: { $gte: startOfMonth },
        })

        const favouriteContact  = await db.collection("contacts").countDocuments({favorite: true})

        return Response.json(
            {
                total,
                recentlyAdded,
                favorite: favouriteContact,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Failed to fetch contacts count" },
            { status: 500 }
        );
    }
}
