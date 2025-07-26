import React, { useState, useEffect } from 'react';
import { icmsTable } from '../icmsTable';

function Calculator() {
  const [ufOrigem, setUfOrigem] = useState('SP');
  const [ufDestino, setUfDestino] = useState('RJ');
  const [valorNota, setValorNota] = useState(0);
  const [percentualSeguro, setPercentualSeguro] = useState(0.3);
  const [tipoCaminhao, setTipoCaminhao] = useState('Leve');
  const [taxaServico, setTaxaServico] = useState(150);
  const [aliquotaICMS, setAliquotaICMS] = useState(0);

  const opcoesCaminhao = {
    Leve: 150,
    Médio: 250,
    Pesado: 400,
  };

  useEffect(() => {
    const taxa = icmsTable[ufOrigem]?.[ufDestino] || 12;
    setAliquotaICMS(taxa);
  }, [ufOrigem, ufDestino]);

  const calcular = () => {
    const icms = (valorNota * aliquotaICMS) / 100;
    const seguro = (valorNota * percentualSeguro) / 100;
    const servico = opcoesCaminhao[tipoCaminhao];
    setTaxaServico(servico);
    return icms + seguro + servico;
  };

  const ufs = Object.keys(icmsTable);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculadora de Frete</h1>
      <label>UF Origem:
        <select value={ufOrigem} onChange={e => setUfOrigem(e.target.value)}>
          {ufs.map(uf => <option key={uf}>{uf}</option>)}
        </select>
      </label>
      <label>UF Destino:
        <select value={ufDestino} onChange={e => setUfDestino(e.target.value)}>
          {ufs.map(uf => <option key={uf}>{uf}</option>)}
        </select>
      </label>
      <label>Valor da Nota:
        <input type="number" value={valorNota} onChange={e => setValorNota(+e.target.value)} />
      </label>
      <label>Tipo de Caminhão:
        <select value={tipoCaminhao} onChange={e => setTipoCaminhao(e.target.value)}>
          {Object.keys(opcoesCaminhao).map(tp => <option key={tp}>{tp}</option>)}
        </select>
      </label>
      <div className="mt-4">
        <p>Alíquota ICMS: {aliquotaICMS}%</p>
        <p>Seguro: {(valorNota * percentualSeguro / 100).toFixed(2)}</p>
        <p>Taxa de Serviço: {taxaServico.toFixed(2)}</p>
        <p className="font-bold">Total: R$ {calcular().toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Calculator;