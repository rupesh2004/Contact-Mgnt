import { ObjectId } from "mongodb";
import client from "../../../../../lib/mongodb";

/* GET single contact */
export async function GET(req, context) {
    const { params } = context;
    const { id } = await params;

    await client.connect();
    const db = client.db("savedContacts");

    if (!ObjectId.isValid(id)) {
        return Response.json(
            { error: "Invalid ID", received: id },
            { status: 400 }
        );
    }

    const contact = await db
        .collection("contacts")
        .findOne({ _id: new ObjectId(id) });

    if (!contact) {
        return Response.json(
            { error: "Contact not found" },
            { status: 404 }
        );
    }

    return Response.json({ contact }, { status: 200 });
}

/* DELETE contact */
export async function DELETE(req, context) {
    const { params } = context;
    const { id } = await params;

    await client.connect();
    const db = client.db("savedContacts");

    if (!ObjectId.isValid(id)) {
        return Response.json(
            { error: "Invalid ID", received: id },
            { status: 400 }
        );
    }

    const result = await db
        .collection("contacts")
        .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        return Response.json(
            { error: "Contact not found" },
            { status: 404 }
        );
    }

    return Response.json(
        { message: "Contact deleted successfully" },
        { status: 200 }
    );
}

export async function PUT(req, { params }) {
    const { id } = await params; // ✅ no await
    const body = await req.json();

    if (!ObjectId.isValid(id)) {
        return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("savedContacts");

    const result = await db.collection("contacts").updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );

    if (result.matchedCount === 0) {
        return Response.json({ error: "Contact not found" }, { status: 404 });
    }

    return Response.json({ message: "Contact updated successfully" }, { status: 200 });
}