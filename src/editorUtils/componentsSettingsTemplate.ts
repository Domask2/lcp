import {ComplexInteractionSettings, DsInteractionSettings, PreviewSettings, PropsSettings, StandartSettings, StyleSettings, UniqSettings} from "./editorDictionaries";

export const ComponentsSettingsTemplate: any = {
    Row: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsRow: {
            Arr: [UniqSettings.Row]
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Col: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsRow: {
            Arr: [UniqSettings.Col],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Card: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, StandartSettings.Br, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StandartSettings.Br, PreviewSettings.Size, PreviewSettings.Caption, PreviewSettings.ClassName, StandartSettings.Br, StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.HeadStyle, StandartSettings.Br, StyleSettings.BodyStyle],
            Card: false
        },
    },
    Divider: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StandartSettings.Br, PreviewSettings.Caption, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
    },
    Button: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, StandartSettings.Br, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StandartSettings.Br, PreviewSettings.Caption, PreviewSettings.ClassName, PreviewSettings.PropsType, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
        DsSettings: {
            Arr: [ComplexInteractionSettings.Actions, DsInteractionSettings.Ds, DsInteractionSettings.ResetInputs, DsInteractionSettings.CloseModal, DsInteractionSettings.ReduxElements],
            Card: false
        },
        ComplexInteractionSettings: {
            Arr: [ComplexInteractionSettings.GetUrl],
            Card: true
        },
    },
    Table: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, DsInteractionSettings.TableDs],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, PreviewSettings.Size, PreviewSettings.Selectable, PreviewSettings.SelectType, PropsSettings.Pagination, PropsSettings.Scroll, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
    },
    TableTree: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [DsInteractionSettings.DsKey, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
    },
    Text: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsRow: {
            Arr: [UniqSettings.Text]
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Modal: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, StandartSettings.Br, ...Object.values(StandartSettings), StandartSettings.Br, PreviewSettings.AddictionName],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, PreviewSettings.ButtonTitle, PreviewSettings.ButtonClassName, PreviewSettings.ButtonType, StandartSettings.Br, StyleSettings.MaskStyle, StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.BodyStyle],
            Card: false
        },
    },
    Tabs: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsRow: {
            Arr: [UniqSettings.Tabs]
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Tags: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, PreviewSettings.Caption, StandartSettings.Br, PreviewSettings.AddictionName],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [DsInteractionSettings.Ds, DsInteractionSettings.ListKey, DsInteractionSettings.ListValues, DsInteractionSettings.ListTitle, DsInteractionSettings.DsIterations, StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle, StandartSettings.Br, StyleSettings.LabelStyle, StandartSettings.Br, StyleSettings.ContentStyle],
            Card: false
        },
    },
    Details: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style, StandartSettings.Br, StyleSettings.HeadStyle, StandartSettings.Br, StyleSettings.BodyStyle],
            Card: false
        },
    },
    Breadcrumb: {
        StandartSettingsRow: {
            Arr: [PreviewSettings.Preview],
            Card: false
        },
        StandartSettings: {
            Arr: [PreviewSettings.Title, StandartSettings.Br, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [UniqSettings.Breadcrumb, StyleSettings.Style],
            Card: true
        },
    },
    Form: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StyleSettings: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Select: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StyleSettings: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    Image: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, PropsSettings.Src, PropsSettings.Width, PropsSettings.Height, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
    },
    ImageGallery: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, PropsSettings.Src, StandartSettings.Br, PreviewSettings.BaseUrl, DsInteractionSettings.Ds, DsInteractionSettings.ImageKey, PropsSettings.Width, PropsSettings.Height, StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.ImageStyle],
            Card: false
        },
    },
    Drawer: {
        StandartSettings: {
            Arr: [StandartSettings.Br, PreviewSettings.Preview, StandartSettings.Br, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.ButtonTitle, PreviewSettings.ButtonClassName, PreviewSettings.ButtonType, StandartSettings.Br, PropsSettings.Title, PropsSettings.Width, StandartSettings.Br, StyleSettings.BodyStyle, StandartSettings.Br, StyleSettings.HeadStyle],
            Card: false
        },
    },
    Descriptions: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [DsInteractionSettings.DsKey, DsInteractionSettings.Show, DsInteractionSettings.Hide, StandartSettings.Br, DsInteractionSettings.AddButtton, DsInteractionSettings.ActionButttonTitle, ComplexInteractionSettings.Actions],
            Card: false
        },
        Preview: {
            Arr: [PropsSettings.Size, PropsSettings.Title, PropsSettings.Bordered, StandartSettings.Br, PropsSettings.Column],
            Card: false
        },
        StyleSettings: {
            Arr: [PropsSettings.Size, StyleSettings.Style, StandartSettings.Br, StyleSettings.LabelStyle, StandartSettings.Br, StyleSettings.ContentStyle, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
    },
    Dropdown: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StyleSettings: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    NavLink: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, ...Object.values(StandartSettings)],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StandartSettings.Br, PreviewSettings.Text, PreviewSettings.Url, PreviewSettings.Target, PreviewSettings.LineBreak, StyleSettings.Style],
            Card: false
        },
    },
    BarCode: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, ...Object.values(StandartSettings), StyleSettings.Style],
            Card: true
        },
        StandartSettingsColTwo: {
            Arr: [PropsSettings.Value, PropsSettings.DisplayValue, PropsSettings.TextAlign, PropsSettings.TextPosition, StandartSettings.Br, PropsSettings.Options],
            Card: false
        },
    },
    QRCode: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, ...Object.values(StandartSettings), StyleSettings.Style],
            Card: true
        },
        StandartSettingsColTwo: {
            Arr: [PropsSettings.QrProps, PropsSettings.QrEcLevel, PropsSettings.QrStyle, PropsSettings.QrEnableCors],
            Card: false
        },
    },
    Pagination: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [DsInteractionSettings.DsKey, StandartSettings.Br, DsInteractionSettings.CurPage, DsInteractionSettings.PerPage, StandartSettings.Br, StyleSettings.Style],
            Card: false
        },
    },
    Search: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.SearchDs, DsInteractionSettings.SearchDsPrefix, StandartSettings.Br, StyleSettings.Style, StyleSettings.InputsStyle],
            Card: false
        },
    },
    Input: {
        StandartSettings: {
            Arr: [PreviewSettings.Preview, ...Object.values(StandartSettings)],
            Card: true
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.InputsType, PreviewSettings.Prefix, PreviewSettings.Numeric, StandartSettings.Br, PreviewSettings.Caption, PreviewSettings.InputDescription, StandartSettings.Br, PreviewSettings.Direction, PreviewSettings.Link, PreviewSettings.Disabled, StyleSettings.InputWidth, StyleSettings.Style, StandartSettings.Br, StyleSettings.BodyStyle, StandartSettings.Br, StyleSettings.InputsStyle, StandartSettings.Br, ComplexInteractionSettings.FlyInputsConditions,],
            Card: false
        },
        DsSettings: {
            Arr: [ComplexInteractionSettings.Actions, ComplexInteractionSettings.FlyInputsDsSettings],
            Card: true
        },
        DsSettingsBottomRow: {
            Arr: [ComplexInteractionSettings.DetailsPickerMenu],
            Card: true
        },
        ComplexInteractionSettings: {
            Arr: [PreviewSettings.InputsType, PreviewSettings.Prefix, PreviewSettings.Numeric, StandartSettings.Br, ComplexInteractionSettings.FlyInputsValidation, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary, PreviewSettings.ExtComponent],
            Card: false
        },
    },
    Ext: {
        StandartSettings: {
            Arr: [PreviewSettings.ExtComponentCmpKey],
            Card: false
        },
    },
    Test: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), PreviewSettings.Caption],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: Object.values(StyleSettings),
            Card: false
        }
    },
    ChartBar: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.PropsYField, PreviewSettings.Format, PreviewSettings.BarColorPlus, PreviewSettings.BarColorMinus, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartPie: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, PreviewSettings.Text, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PreviewSettings.ChartColorField, PreviewSettings.ChartPieAngleField, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartColumn: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.PropsYField, PreviewSettings.BarColorPlus, PreviewSettings.BarColorMinus, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartHistogram: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.BinField, PropsSettings.XAxisMin, PropsSettings.XFieldNumeric, PropsSettings.BinWidth, PropsSettings.BinFieldForUsers, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartLine: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.PropsYField, PreviewSettings.LineSmooth, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartMultiLine: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.XAxisMin, PropsSettings.XFieldNumeric, StandartSettings.Br, PropsSettings.PropsYField, PropsSettings.YAxisMin, PropsSettings.YFieldNumeric, StandartSettings.Br, PropsSettings.PropsSeriesField, PreviewSettings.LineSmooth, StandartSettings.Br, PreviewSettings.TooltipFields],
            Card: false
        },
    },
    ChartRadarPlot: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.PropsYField, StandartSettings.Br, ComplexInteractionSettings.FlyInputsInitDictionary],
            Card: false
        },
    },
    ChartScatter: {
        StandartSettings: {
            Arr: [...Object.values(StandartSettings), StandartSettings.Br, StyleSettings.Style, StandartSettings.Br, StyleSettings.TitleStyle],
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [PreviewSettings.Caption, StandartSettings.Br, DsInteractionSettings.DsKey, StandartSettings.Br, PropsSettings.PropsXField, PropsSettings.XAxisMin, PropsSettings.XFieldNumeric, StandartSettings.Br, PropsSettings.PropsYField, PropsSettings.YAxisMin, PropsSettings.YFieldNumeric, StandartSettings.Br, PreviewSettings.ChartColorField, StandartSettings.Br, PreviewSettings.TooltipFields, StandartSettings.Br],
            Card: false
        },
    },
    BidirectionalBar: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        DsSettings: {},
        StyleSettings: {
            Arr: [StyleSettings.Style],
            Card: false
        },
    },
    DownLoad: {
        StandartSettings: {
            Arr: Object.values(StandartSettings),
            Card: false
        },
        StandartSettingsColTwo: {
            Arr: [StyleSettings.Style, StandartSettings.Br],
            Card: false
        },
    },
}
