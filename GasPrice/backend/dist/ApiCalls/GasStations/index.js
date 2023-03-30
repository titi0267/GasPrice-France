"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_services_1 = __importDefault(require("../../services/request.services"));
const fetchGasStations = async (code_department) => {
    const fetchNumberOfResult = await (0, request_services_1.default)(`https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=0&facet=code_departement&refine.code_departement=${code_department}`, "GET", "gouv.data gas stations");
    const fetchGasStations = await (0, request_services_1.default)(`https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=${fetchNumberOfResult.nhits}&facet=code_departement&refine.code_departement=${code_department}`, "GET", "gouv.data gas stations");
    console.log("NUmber of results for " + code_department + " : " + fetchGasStations.nhits);
    const refineRecords = [];
    fetchGasStations.records.map(element => {
        refineRecords.push({
            recordid: element.recordid,
            geometry: element.geometry,
            fields: {
                id: element.fields.id,
                latitude: element.fields.latitude,
                longitude: element.fields.longitude,
                adresse: element.fields.adresse,
                ville: element.fields.ville,
                gazole_maj: element.fields.gazole_maj,
                gazole_prix: element.fields.gazole_prix,
                sp95_maj: element.fields.sp95_maj,
                sp95_prix: element.fields.sp95_prix,
                e85_maj: element.fields.e85_maj,
                e85_prix: element.fields.e85_prix,
                gplc_maj: element.fields.gplc_maj,
                gplc_prix: element.fields.gplc_prix,
                e10_maj: element.fields.e10_maj,
                e10_prix: element.fields.e10_prix,
                sp98_maj: element.fields.sp98_maj,
                sp98_prix: element.fields.sp98_prix,
                carburants_disponibles: element.fields.carburants_disponibles,
                carburants_indisponibles: element.fields.carburants_indisponibles,
                departement: element.fields.departement,
                code_departement: element.fields.code_departement,
                region: element.fields.region,
            },
        });
    });
    return { nhits: fetchGasStations.nhits, records: refineRecords };
};
exports.default = fetchGasStations;
//# sourceMappingURL=index.js.map