import { populateDatabase } from "@/lib/service/test";

export default function TestPage() {
    populateDatabase();
    return (
        <div>
            Test
        </div>
    );
}
