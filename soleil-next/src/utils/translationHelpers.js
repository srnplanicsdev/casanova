export const mapTypeToKey = (type) => {
    if (!type) return "";
    const types = {
        "Apartment / flat": "api.propertyType.apartment",
        "Bungalow": "api.propertyType.bungalow",
        "Villa": "api.propertyType.villa",
        "Penthouse": "api.propertyType.penthouse",
        "Townhouse": "api.propertyType.townhouse",
        "Duplex": "api.propertyType.duplex"
    };
    return types[type] || type;
};

export const mapStatusToKey = (status) => {
    if (!status) return "";
    const statuses = {
        "New Build": "api.status.newBuild",
        "Resale": "api.status.resale"
    };
    return statuses[status] || status;
};
