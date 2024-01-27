export const company_name = "logo"
export const LOGO_SRC = "/assets/logo.png"
export const COMPANY_NAME_SHOW = false

// #########################____Global____#################################

export const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1;
export const PAGE_TYPE_ADD = "ADD";
export const PAGE_TYPE_EDIT = "EDIT";
export const PAGE_TYPE_DETAILS = "DETAILS";
// #########################____FILTER____#################################
// how match time tack before run
export const DEBOUNCE_THRESHOLD = 500


//  how any row user can select 
export const TABLE_ITEM_OPTION = [5, 10, 25, 50, 75, 100];



//  list order data 
export const LIST_ORDER_TYPE_DATA = {
    Recent: "recent",
    Older: "older",
    "A-Z": "ASC",
    "Z-A": "DESC",
};
export const LIST_ORDER_TYPE_KEYS = Object.keys(LIST_ORDER_TYPE_DATA)


// list filter type

export const FILTER_OPTION_TYPE_DATA = {
    name: "first_name",
    company: "company_name",
    address: "address",
    phone: "phone_number",
    email: "email",
}

export const FILTER_OPTION_TYPE_KEY = Object.keys(FILTER_OPTION_TYPE_DATA)


// initial filter data
export const INIT_FILTER = {
    limit: 5,
    startDate: "",
    endDate: "",
    search: "",
    orderBy: "",
    order: "",
};

export const INIT_FILTER_KEY = Object.keys(INIT_FILTER)

// #########################____LOGIN____#################################
const FORGOT_PASSWORD_PAGE = "FORGOT_PASSWORD_PAGE", OTP_PAGE = "OTP_PAGE", CONFIRM_PASSWORD_PAGE = "CONFIRM_PASSWORD_PAGE"
export {FORGOT_PASSWORD_PAGE, OTP_PAGE, CONFIRM_PASSWORD_PAGE}

// #########################____USER____#################################

export const USER_ROLE_TYPE_DATA = {
    "1": "admin",
    "2": "user",
    "3": "editor",
    "4": "broker",
};

export const USER_ROLE_TYPE_KEY = Object.keys(USER_ROLE_TYPE_DATA)

// #########################____TAX____#################################


export const TAX_TYPE_DATA = {
    "1": "CGST",
    "2": "SGST",
    "3": "IGST",
};
export const TAX_TYPE_KEY = Object.keys(TAX_TYPE_DATA)



// #########################____PURCHASE____#################################

export const PURCHASE_STATUS_TYPE_DATA = {
    "1": "pending",
    "2": "intersect",
    "3": "delivered",
};
export const PURCHASE_STATUS_TYPE_KEY = Object.keys(PURCHASE_STATUS_TYPE_DATA)





// ##########################______state_______##################################



export const STATE_NAME = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CG": "Chandigarh",
    "CH": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LA": "Ladakh",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TS": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UK": "Uttarakhand",
    "WB": "West Bengal"
}

export const STATE_OPTION = Object.keys(STATE_NAME).map((state: string) => ({value: STATE_NAME[state as unknown as keyof typeof STATE_NAME], label: STATE_NAME[state as unknown as keyof typeof STATE_NAME]}))
