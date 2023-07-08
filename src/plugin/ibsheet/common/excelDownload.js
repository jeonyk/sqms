/** Excel Download 용 js */

export default {
    /** 품질활동 - 자재 - headsetup - 1 */
    QUALITY_MATERIAL_HEADSETUP_1: {
        options: {
            Cfg: {
                NoVScroll: false,
            },
            Cols: [
                { Name: 'mainCodeId', Header: [{ Value: '공종'}], Type: 'Enum', RelWidth: 10 },
                { Name: 'midCodeId', Header: [{ Value: '세부공종' }], Type: 'Enum', RelWidth: 10 },
                { Name: 'productName', Header: [{ Value: '품명' }], Size: 45, RelWidth: 20 },
                { Name: 'productMeta', Header: [{ Value: '품명메타' }], Size: 230, RelWidth: 20 },
                { Name: 'materialMainYn', Header: [{ Value: '주요자재\n여부' }], Type: 'Bool', TrueValue: 'Y', FalseValue: 'N', RelWidth: 5, },
                { Name: 'acceptCheckYn', Header: [{ Value: '인수검사\n필수여부' }], Type: 'Bool', TrueValue: 'Y', FalseValue: 'N', RelWidth: 5 },
                { Name: 'factoryCheckYn', Header: [{ Value: '공장검사\n필수여부' }], Type: 'Bool', TrueValue: 'Y', FalseValue: 'N', RelWidth: 5 },
            ],
        },
    },

} 