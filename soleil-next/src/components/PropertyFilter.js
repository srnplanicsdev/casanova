"use client"
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../utils/useLanguage";
import { properties } from "../dummy-data/API.js"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


export default function PropertyFilter({filter, filterdProperty}) {
  const [form, setForm] = useState({
    status: [],
    towns: [],
    types: [],
    bedrooms: "",
    bathrooms: "",
    priceFrom: "",
    priceUpTo: "",
    reference: "",
    pool: false,
  });
  const { t } = useLanguage();
 const pathname = usePathname();
  const router = useRouter();
  const filteredProperties = useMemo(() => {
    if (!filterdProperty || !filterdProperty.length) return []
    return filterdProperty.filter(property => {
      if (form.status.length) {
        const match = form.status.some(s =>
          property.status.includes(s)
        )
        if (!match) return false
      }
      if (form.towns.length) {
        const townValues = form.towns.map(t => t.label)
        if (!townValues.includes(property.location.city)) return false
      }
      if (form.types.length) {
        const typeValues = form.types.map(t => t.label)
        if (!typeValues.includes(property.type)) return false
      }
      if (form.bedrooms) {
        if (form.bedrooms && property.propertyDetails.bedrooms < +form.bedrooms) return false
      }
      if (form.bathrooms) {
        if (form.bathrooms && property.propertyDetails.bathrooms < +form.bathrooms) return false
      }
      if (form.priceFrom) {
        if (Math.floor(property.price) < Math.floor(form.priceFrom)) return false
      }
      if (form.priceUpTo) {
        if (Math.ceil(property.price) > Math.ceil(form.priceUpTo)) return false
      }
      if (form.reference) {
        if (!property.reference.toLowerCase().includes(form.reference.toLowerCase()))
          return false
      }
      if (form.pool) {
        if (!property.propertyDetails.pool) return false
      }
      return true
    })
  }, [form, filterdProperty]) 


  const resetFilters = () => {
    setForm(prev => ({
      ...prev,
      status: [],
      towns: [],
      types: [],
      bedrooms: "",
      bathrooms: "",
      priceFrom: "",
      priceUpTo: "",
      reference: "",
      pool: false,
    }));
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    if (pathname !== "/properties") {
      await router.push("/properties");
      return;
    }
    filter(filteredProperties)
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-10">

      <form onSubmit={submitSearch} className="p-6">
        <div className="pb-2 lg:pb-2">
          <div className="flex flex-wrap justify-start pt-4 lg:pt-0 pb-0 gap-2">
            <div className="inline-flex">
              <label
                className={`min-w-[95%] block relative cursor-pointer text-center transition-all duration-300 ease-in-out rounded-4xl backdrop-blur-sm opacity-70 hover:opacity-100 bg-white text-[#535353] ${form.status.includes('New Build')
                  ? ' bg-gold!  opacity-100'
                  : ''
                  }`}>
                <span
                  className={`inline-block text-center px-8 py-3 uppercase tracking-[1.4px] transition-all duration-300 ease-in-out text-sm font-normal text-gray-900 ${form.status.includes('New Build') ? ' text-white!' : ''}`}
                >
                  {t("properties-filter.new-build")}
                </span>

                <input type="checkbox"
                  checked={form.status.includes("New Build")}
                  onChange={() => {
                    const value = "New Build";
                    setForm(prev => ({
                      ...prev,
                      status: prev.status.includes(value)
                        ? prev.status.filter(v => v !== value)
                        : [...prev.status, value],
                    }));
                  }} value="New Build" className="hidden" />

                <span
                  className="absolute top-1/2 left-0 -translate-y-1/2 p-[12px_12px_11px] w-fit min-w-full max-w-full"></span>
              </label>
            </div>
            <div className="inline-flex">
              <label
                className={`min-w-[95%] block relative cursor-pointer text-center text-[#535353] bg-white rounded-4xl backdrop-blur-sm opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out ${form.status.includes('Resale') ? 'bg-gold!  opacity-100' : ''
                  }`}>
                <span
                  className={`inline-block text-center px-8 py-3 uppercase tracking-[1.4px] transition-all duration-300 ease-in-out text-sm font-normal text-gray-900 ${form.status.includes('Resale') ? ' text-white!' : ''}`}>
                  {t("properties-filter.resale")}
                </span>

                <input type="checkbox"
                  checked={form.status.includes("Resale")}
                  onChange={() => {
                    const value = "Resale";
                    setForm(prev => ({
                      ...prev,
                      status: prev.status.includes(value)
                        ? prev.status.filter(v => v !== value)
                        : [...prev.status, value],
                    }));
                  }} value="Resale" className="hidden" />

                <span
                  className="absolute top-1/2 left-0 -translate-y-1/2 p-[12px_12px_11px] w-fit min-w-full max-w-full"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mb-2 py-2 px-3 md:divide-x md:divide-gray-300
 bg-white">
          <div className="flex justify-center items-center text-sm  ">
            <Select
              instanceId="towns-select"
              isMulti
              value={form.towns}
              onChange={(selected) => setForm(prev => ({ ...prev, towns: selected || [] }))}
              options={properties.towns}
              getOptionLabel={opt => opt.label}
              getOptionValue={opt => opt.value}
              className="w-full mr-2  "
            />
          </div>

          <div className="flex justify-center items-center">
            <Select
              instanceId="types-select"
              isMulti
              value={form.types}
              onChange={(selected) => setForm(prev => ({ ...prev, types: selected || [] }))}
              options={properties.type}
              getOptionLabel={opt => opt.label}
              getOptionValue={opt => opt.value}
              className="w-full mr-2"
            />
          </div>

          <select name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full p-2 appearance-none focus:outline-none border-0">
            <option value=""> {t('properties-filter.bedrooms')}</option>
            {[1, 2, 3, 4].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="5">+5</option>
          </select >

          <select name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full p-2 appearance-none focus:outline-none border-0">
            <option value="">{t('properties-filter.bathrooms')}</option>
            {[1, 2, 3, 4].map(n => (<option key={n} value={n}>{n}</option>))}
            <option value="5">+5</option>
          </select >
          <select name="priceFrom" value={form.priceFrom} onChange={handleChange} className="w-full p-2 appearance-none focus:outline-none border-0">
            <option value="">{t('properties-filter.price-from')}</option>
            {properties.price.map(price => (<option key={price.value} value={price.value}>{price.label.toLocaleString()}</option>))}
          </select >
          <select name="priceUpTo" value={form.priceUpTo} onChange={handleChange} className="w-full p-2 appearance-none focus:outline-none border-0">
            <option value="">{t('properties-filter.price-up-to')}</option>
            {properties.price.map((price) => (
              <option key={price.value} value={price.value}>{price.label.toLocaleString()}</option>
            ))}
          </select >
        </div >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 items-center bg-white min-h-16">
          <input type="text" name="reference" value={form.reference} onChange={handleChange} placeholder={t('properties-filter.reference')}
            className="w-full p-2 h-full focus:outline-none border-0 border-gray-300 text-sm" />
          <label className="flex items-center space-x-2 px-2">
            <label className="group flex items-start cursor-pointer">
              <input type="checkbox" name="pool" checked={form.pool} onChange={(e) => setForm(prev => ({ ...prev, pool: e.target.checked }))} className="sr-only" />
              <span
                className="flex h-6.5 w-6.5 min-w-6.5 items-center justify-center rounded-full border border-gray-800 group-has-checked:bg-gold group-has-checked:border-gold transition duration-300 ease-in-out">
                <svg className="h-4 w-4 text-white opacity-0 group-has-checked:opacity-100 transition-opacity"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z"
                    clipRule="evenodd" />
                </svg>
              </span>
            </label>
            <span className="text-sm text-gray-700">{t('properties-filter.pool')}</span>
          </label>
          <button type="button" onClick={() => resetFilters()} className="w-full p-2 h-full text-gray-700 text-sm underline">
            {t("properties-filter.clean")}
          </button>
          <button type="button" onClick={() => router.push('/search')}
            className="w-full p-2 h-full text-gray-700 text-sm underline" >
            {t("properties-filter.advanced-filter")
            }
          </button >
          <div className="flex items-center h-full p-0 m-0 col-span-2">
            <button type="submit"
              className="w-full p-2 h-full capitalize tracking-[3px] text-white text-sm font-semibold flex items-center justify-center bg-gold">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              {t("properties-filter.search")}
            </button>
          </div>
        </div >
      </form >
    </div >
  );
}