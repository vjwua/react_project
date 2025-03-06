import { type ReactElement } from "react";

interface TableProps {
    bg: string;
    componentHeader: Array<string>;
    children: ReactElement;
}

export default function TableCard({bg, componentHeader, children}: TableProps) {
    return (
        <div className="flex justify-center m-4">
            <table className={bg}>
                <thead>
                    <tr>
                        {componentHeader.map((header, index) =>
                            <th key={index} className="py-1">{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}