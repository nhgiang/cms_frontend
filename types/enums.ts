export enum UserStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export enum UploaderStatus {
  NotSelected,
  Selected,
  InProgress,
  Completed
}

export enum AssetType {
  undefined = 0,
  Video,
  Image,
  File
}

export enum FileUploadErrors {
  Size = 1,
  Type = 2
}

export enum ContactStatus {
  NotContactedYet = 'NotContactedYet',
  Contacted = 'Contacted'
}
