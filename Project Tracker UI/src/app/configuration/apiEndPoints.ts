// Define globally, all the api endpoints here
// Expose the same in configuration.service.ts
// Typically you will implenet this in individual components service



export const apiEndpoints = {
    GetCompleteDetails: '/GetCompleteDetails',
    GetInvoice: '/GetInvoiceDetailsByProjectIDPOID/',
    AddProject: '/AddProject',
    DeleteProject:'/DeleteProject/',
    EditProject:'/EditProject/',
    GetProjectbyID:'/GetAllDetails/',
    GetPOdetailsbyid:'/ViewPODetails/',
    PODetails: '/GetPODetails',
    PostFile: '/ADDAttachment/',
    ViewPODetailsByProjectID:'/ViewPODetailsByProjectID/',
    DeletePOByID:'/DeletePO/',
    EditPOByPOID:'/EditPO',
    AddInvoice:'/UpdateInvoice/',
    ViewDetailsPage:'/ViewDetailsPage/',
    EditInvoice:'/EditInvoice/',
    DeleteInvoiceByID:'/DeleteInvoiceByID/',
    GetInvoiceDetailsByProjectID:'/GetInvoiceDetailsByProjectID/',
    GetAllInvoices:'/GetInvoiceDetails'

    };