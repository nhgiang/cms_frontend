export class SortType {
  public static ASC = new SortType(1, 'ascend', 'ASC');
  public static DESC = new SortType(2, 'descend', 'DESC');

  public static All = [
    SortType.ASC,
    SortType.DESC,
  ];

  id: number;
  name: string;
  key: string;

  constructor(id: number, name: string, key: string) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static fromName(params: string): SortType {
    const result = SortType.All.find(t => t.name === params || t.key === params);
    return result;
  }
}