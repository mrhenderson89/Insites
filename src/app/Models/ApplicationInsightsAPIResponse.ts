    export interface Metric {
        value: number;
    }

    export interface RequestSegment {
        metric: Metric;
        metricId: string;
    }

    export interface Segment {
        start: Date;
        end: Date;
        segments: RequestSegment[];
    }

    export interface Value {
        start: Date;
        end: Date;
        interval: string;
        segments: Segment[];
    }

    export interface Response {
        value: Value;
    }

