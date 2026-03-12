import { PROPERTY_I18N_MAP } from "../property.mapper";


export function mapToI18nKey(value) {
  if (!value) return "";
  return PROPERTY_I18N_MAP[value] || value;
}
