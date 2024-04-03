interface FreteDetalhe {
    preco: number;
    carrierName: string;
  }
  
  interface MetricasTransportadora {
    quantidadeResultados: number;
    totalPrecoFrete: number;
    mediaPrecoFrete: number;
  }
  
  export interface Metricas {
    freteMaisBaratoGeral: FreteDetalhe;
    freteMaisCaroGeral: FreteDetalhe;
    porTransportadora: {
      [carrierName: string]: MetricasTransportadora;
    };
  }
  