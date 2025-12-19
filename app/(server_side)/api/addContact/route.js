import client from "../../../../lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            address,
            notes,
            favorite,
        } = body;
        if (!firstName || !lastName || !phone) {
            return Response.json(
                { error: "First name, last name and phone are required" },
                { status: 400 }
            );
        }

        await client.connect();
        const db = client.db("savedContacts");
        const contacts = db.collection("contacts");

        const existingContact = await contacts.findOne({ phone });

        if (existingContact) {
            return Response.json(
                { error: "Contact with this phone already exists" },
                { status: 409 }
            );
        }

        const result = await contacts.insertOne({
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            address,
            notes,
            favorite: Boolean(favorite),
            createdAt: new Date(),
        });

        return Response.json(
            {
                success: true,
                message: "Contact added successfully",
                contactId: result.insertedId,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
