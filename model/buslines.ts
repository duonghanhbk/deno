// Defining schema interface
export interface Region {
  name: string;
  region_id: string;
}

export interface RouteDataItem {
  id: string;
  name: string;
}

export interface SingleLinesItem {
  name: string;
  region_id: string;
  route_datas: Array<RouteDataItem>;
}

export type Buslines = {
  multi_lines: Region[];
  single_lines: SingleLinesItem[];
};
