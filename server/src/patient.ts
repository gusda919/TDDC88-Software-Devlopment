export interface Patient {
    patientID:            string;
    familyName:           string;
    givenName:            string;
    description:          string;
    gender:               string;
    nextCheckupIn:        string;
    triage:               string;
    contagious:           string;
    newECG:               string;
    newXray:              string;
    roomBed:              string;
    importantInformation: null;
    proposedMeasures:     null;
    VitalParameters:      VitalParameters;
    entrancesAndExits:    EntrancesAndExit[];
    caregiving:           Caregiving[];
    labs:                 Lab[];
    drugs:                Drug[];
    fluidBalance:         FluidBalance;
    cosmic:               Cosmic;
}

export interface FluidBalance {
    in: FluidBalanceData[];
    out: FluidBalanceData[];
}

export interface FluidBalanceData {
    label: string;
    value: number;
}

export interface Caregiving {
    date: string;
    time: string;
    note: string;
}

export interface Cosmic {
    "se:JournalNoteEHRExtracts": SEJournalNoteEHRExtracts;
}

export interface SEJournalNoteEHRExtracts {
    "-xsi:schemaLocation": string;
    "-xmlns:xsi":          string;
    "-xmlns:se":           string;
    XSDVersion:            XSDVersion;
    JournalNoteEHRExtract: JournalNoteEHRExtract;
}

export interface JournalNoteEHRExtract {
    ehr_id:               EhrID;
    ehr_system:           EhrID;
    time_created:         TimeCreated;
    Note:                 Note;
    Patient:              Patient;
    HCMContact:           HCMContact;
    Units:                Units;
    CareUnit:             Unit;
    AccessZoneUnit:       Unit;
    HeadCareproviderUnit: Unit;
    CareProviders:        CareProviders;
}

export interface Unit {
    UnitID:      EhrID;
    UnitLocalID: EhrID;
}

export interface EhrID {
    "-root":         string;
    "-extension":    string;
    "-self-closing": string;
}

export interface CareProviders {
    CareProvider: CareProvider;
}

export interface CareProvider {
    CareProviderType:       string;
    CareProviderID:         EhrID;
    CareProviderInternalID: string;
    CareProviderName:       string;
    ProviderPosition:       ProviderPosition;
    CareProviderUnit:       Unit;
}

export interface ProviderPosition {
    CareProviderPositionID:   EhrID;
    CareProviderPositionName: string;
}

export interface HCMContact {
    target_id:             EhrID;
    HCMContacInternaltID:  string;
    ContactPerformingUnit: string;
    HCMContactType:        string;
    HCMContactBegin:       TimeCreated;
    HCMContactEnd:         TimeCreated;
    HCMContactStatus:      string;
    ContactSecrecyLevels:  ContactSecrecyLevels;
}

export interface ContactSecrecyLevels {
    "-self-closing": string;
}

export interface TimeCreated {
    "-value":        string;
    "-self-closing": string;
}

export interface Note {
    NoteId:              EhrID;
    NoteVersionDateTime: TimeCreated;
    NoteDateTime:        TimeCreated;
    NoteTemplateName:    string;
    NoteTypeOfNote:      string;
    NoteSignDateTime:    ContactSecrecyLevels;
    NoteSecrecyLevels:   SecrecyLevels;
    Records:             Records;
    NoteActive:          string;
}

export interface SecrecyLevels {
    SecrecyLevel: SecrecyLevel;
}

export enum SecrecyLevel {
    Klass3PatientdataNormalnivå = "Klass 3: Patientdata (normalnivå)",
}

export interface Records {
    Record: RecordsRecord[];
}

export interface RecordsRecord {
    Keyword:              string;
    KeywordToolType:      string;
    Values?:              StickyValues;
    Value?:               PurpleValue[] | PurpleValue;
    KeywordSecrecyLevels: SecrecyLevels;
    Record?:              PurpleRecord[] | TentacledRecord;
}

export interface PurpleRecord {
    Keyword:              string;
    KeywordToolType:      string;
    KeywordSecrecyLevels: SecrecyLevels;
    Record?:              FluffyRecord[];
    Values?:              TentacledValues;
    Value?:               IndigoValue;
    OtherValue?:          PurpleOtherValue;
}

export interface PurpleOtherValue {
    "se:ArchetypeRecords": PurpleSEArchetypeRecords;
}

export interface PurpleSEArchetypeRecords {
    "-xmlns:se":     string;
    ArchetypeRecord: PurpleArchetypeRecord;
}

export interface PurpleArchetypeRecord {
    ArchetypeId:     string;
    Name:            string;
    EventDateTime:   EventDateTime;
    ArchetypeRecord: FluffyArchetypeRecord[];
}

export interface FluffyArchetypeRecord {
    Name:      string;
    DataType?: string;
    Magnitude: string;
    Unit?:     string;
    Range?:    string;
}

export interface EventDateTime {
    startDateTime: TimeCreated;
    endDateTime:   TimeCreated;
}

export interface FluffyRecord {
    Keyword:              string;
    KeywordToolType:      string;
    KeywordSecrecyLevels: SecrecyLevels;
    Record?:              TentacledRecord;
    Values?:              FluffyValues;
    Value?:               TentacledValue;
    OtherValue?:          FluffyOtherValue;
}

export interface FluffyOtherValue {
    "se:ArchetypeRecords": FluffySEArchetypeRecords;
}

export interface FluffySEArchetypeRecords {
    "-xmlns:se":     string;
    ArchetypeRecord: TentacledArchetypeRecord;
}

export interface TentacledArchetypeRecord {
    ArchetypeId:     string;
    Name:            string;
    EventDateTime:   EventDateTime;
    ArchetypeRecord: StickyArchetypeRecord[] | FluffyArchetypeRecord;
}

export interface StickyArchetypeRecord {
    Name:      string;
    DataType?: string;
    Magnitude: ContactSecrecyLevels | string;
    Unit?:     string;
    Range?:    string;
}

export interface TentacledRecord {
    Keyword:              string;
    KeywordToolType:      string;
    Values:               PurpleValues;
    Value:                PurpleValue;
    KeywordSecrecyLevels: SecrecyLevels;
}

export interface PurpleValue {
    "-JournalValueType": string;
    "#text":             string;
}

export interface PurpleValues {
    Value: FluffyValue;
}

export interface FluffyValue {
    JournalValueType: string;
    ValueText:        string;
}

export interface TentacledValue {
    "-JournalValueType": string;
    "-self-closing":     string;
}

export interface FluffyValues {
    Value: StickyValue;
}

export interface StickyValue {
    JournalValueType: string;
    ValueText:        ContactSecrecyLevels;
}

export interface IndigoValue {
    "-JournalValueType": string;
    "#text"?:            string;
    "-self-closing"?:    string;
}

export interface TentacledValues {
    Value: IndecentValue;
}

export interface IndecentValue {
    JournalValueType: string;
    ValueText:        ContactSecrecyLevels | string;
}

export interface StickyValues {
    Value: FluffyValue[] | FluffyValue;
}

export interface Patient {
    PatientID:            EhrID;
    PatientInternalID:    string;
    PatientProtectedId:   string;
    PatientSecrecyGroups: ContactSecrecyLevels;
    PatientName:          PatientName;
}

export interface PatientName {
    PatientFamilyName: string;
    PatientMiddleName: ContactSecrecyLevels;
    PatientGivenName:  PatientGivenName;
}

export interface PatientGivenName {
    "-qualifier":    string;
    "-value":        string;
    "-self-closing": string;
}

export interface Units {
    Unit: UnitElement[];
}

export interface UnitElement {
    UnitID:                  EhrID;
    UnitLocalID:             EhrID;
    UnitName:                string;
    UnitSecrecyGroups:       UnitSecrecyGroups;
    HeadCareproviderUnitID?: EhrID;
    AccessZones:             AccessZones;
    PhoneNumbers:            PhoneNumbers;
    EmailAddresses:          ContactSecrecyLevels;
    UnitAddresses:           UnitAddresses;
}

export interface AccessZones {
    AccessZoneID?:    EhrID;
    "-self-closing"?: string;
}

export interface PhoneNumbers {
    Phone?:           Phone[];
    "-self-closing"?: string;
}

export interface Phone {
    PhoneType:    string;
    PhoneNumber:  string;
    PhoneComment: string;
}

export interface UnitAddresses {
    UnitAddress?:     UnitAddressElement[] | PurpleUnitAddress;
    "-self-closing"?: string;
}

export interface UnitAddressElement {
    UnitAddressType:     string;
    UnitAddressAddress:  string;
    UnitAddressPostcode: ContactSecrecyLevels | string;
    UnitAddressCity:     string;
    UnitAddressCounty:   ContactSecrecyLevels;
    UnitAddressCountry:  string;
    UnitAddressComment:  string;
}

export interface PurpleUnitAddress {
    UnitAddressType:     string;
    UnitAddressAddress:  string;
    UnitAddressPostcode: string;
    UnitAddressCity:     string;
    UnitAddressCounty:   ContactSecrecyLevels;
    UnitAddressCountry:  string;
    UnitAddressComment:  string;
}

export interface UnitSecrecyGroups {
    Group?:           string;
    "-self-closing"?: string;
}

export interface XSDVersion {
    "-version":      string;
    "-self-closing": string;
}




export interface Drug {
    date: string;
    time: string;
    type: string;
    dose: string;
}

export interface EntrancesAndExit {
    type:         string;
    size:         number;
    localization: string;
    time:         string;
    action:       null;
    actionTime:   null;
}

export interface Lab {
    date:  string;
    time:  string;
    tests: Test[];
}

export interface Test {
    marker: string;
    value:  number;
}

export interface VitalParameters {
    bloodOxygenLevel: BloodOxygenLevel;
    pulse:            BodyTemperature;
    bloodPressure:    BloodPressure;
    bodyTemperature:  BodyTemperature;
    respiratoryRate:  BodyTemperature;
}

export interface BloodOxygenLevel {
    label: string;
    data:  Datum[];
}

export interface Datum {
    date:  string;
    time:  string;
    value: number;
}

export interface BloodPressureData {
    date: string;
    time: string;
    systolic: number;
    diastolic: number;
}

export interface BloodPressure {
    label: string;
    data:  BloodPressureData[];
}

export interface BodyTemperature {
    label: string;
    data:  Datum[];
}