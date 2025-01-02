//nameFormat ( alpha a to z , or 0 to 9 MIN 4 - MAX 80 - space allowed)
export const nameFormat = new RegExp(/^[a-zA-Z0-9 ]{4,80}$/);

//slugFormat ( alpha a to z , or 0 to 9 MIN 4 - MAX 80)
export const slugFormat = new RegExp(/^[a-z0-9- ]{4,80}$/);

//descriptionFormat ( alpha a to z , or 0 to 9 MIN 4 - MAX 80)
export const descriptionFormat = new RegExp(/^[a-zA-Z0-9 -./',;:?<>é&|()à "]{10,1000}$/);
