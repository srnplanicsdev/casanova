import React, { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";

const Property = () => {
    const [debounceSearch, setDebounceSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const {
        data: properties,
        loading,
        error,
    } = useFetch("http://localhost:3000/api/properties");

    const [search, setSearch] = useState("");

    const filteredProperties = useMemo(() => {
        const searchText = debounceSearch.toLowerCase();
        return properties?.filter(
            (property) =>
                property?.title?.toLowerCase().includes(searchText) ||
                property?.reference?.toLowerCase().includes(searchText) ||
                property?.type?.toLowerCase().includes(searchText) ||
                property?.construction?.year
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText) ||
                property?.status?.toLowerCase().includes(searchText),
        );
    }, [properties, debounceSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 600);
        return () => clearTimeout(timer);
    }, [search]);

    const reqSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedProperties = useMemo(() => {
        if (!sortConfig.key) return filteredProperties;
        return [...filteredProperties].sort((a, b) => {
            const aValue = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((obj, key) => obj[key], a)
                : a[sortConfig.key];
            const bValue = sortConfig.key.includes(".")
                ? sortConfig.key.split(".").reduce((obj, key) => obj[key], b)
                : b[sortConfig.key];

            if (aValue === bValue) return 0;
            if (sortConfig.direction === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return bValue > aValue ? 1 : -1;
            }
        });
    }, [filteredProperties, sortConfig]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error in getting the Table...</div>;
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => reqSort("")}>SR No </th>
                        <th onClick={() => reqSort("title")}>
                            Title{" "}
                            {sortConfig.key === "title"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("type")}>
                            Type{" "}
                            {sortConfig.key === "type"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("status")}>
                            Status{" "}
                            {sortConfig.key === "status"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("price")}>
                            Price{" "}
                            {sortConfig.key === "price"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("reference")}>
                            Reference{" "}
                            {sortConfig.key === "reference"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("energyRating")}>
                            Energy Rat{" "}
                            {sortConfig.key === "energyRating"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("location.city")}>
                            City{" "}
                            {sortConfig.key === "location.city"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("location.area")}>
                            Area{" "}
                            {sortConfig.key === "location.area"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("isSold")}>
                            Sold{" "}
                            {sortConfig.key === "isSold"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th onClick={() => reqSort("construction.year")}>
                            Construction{" "}
                            {sortConfig.key === "construction.year"
                                ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {sortedProperties.map((property, index) => (
                        <tr key={property._id}>
                            <td>{index + 1}</td>
                            <td>{property.title}</td>
                            <td>{property.type}</td>
                            <td>{property.status}</td>
                            <td>{property.price}</td>
                            <td>{property.reference}</td>
                            <td>{property.energyRating}</td>
                            <td>{property.location.city}</td>
                            <td>{property.location.area}</td>
                            <td>{property.isSold === false ? "No" : "Yes"}</td>
                            <td>{property.construction.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Property;
