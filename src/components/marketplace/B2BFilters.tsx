import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, X, Globe, DollarSign, Award, Settings2 } from 'lucide-react';

export interface B2BFilterValues {
  country: string;
  moqRange: [number, number];
  certifications: string[];
  manufacturingTypes: string[];
}

interface B2BFiltersProps {
  filters: B2BFilterValues;
  onFiltersChange: (filters: B2BFilterValues) => void;
  onReset: () => void;
  activeFiltersCount: number;
}

const B2BFilters = ({ filters, onFiltersChange, onReset, activeFiltersCount }: B2BFiltersProps) => {
  const { language } = useLanguage();
  
  const content = {
    ar: {
      filters: 'الفلاتر',
      country: 'بلد المصنع',
      allCountries: 'كل البلدان',
      china: 'الصين',
      india: 'الهند',
      vietnam: 'فيتنام',
      turkey: 'تركيا',
      moq: 'الحد الأدنى للطلب (MOQ)',
      moqRange: 'نطاق MOQ',
      certifications: 'الشهادات',
      manufacturingType: 'نوع التصنيع',
      oem: 'OEM - تصنيع للغير',
      odm: 'ODM - تصميم وتصنيع',
      privateLabel: 'Private Label - علامة تجارية خاصة',
      resetFilters: 'إعادة تعيين',
      minMoq: 'من',
      maxMoq: 'إلى',
      dollars: 'دولار',
    },
    en: {
      filters: 'Filters',
      country: 'Factory Country',
      allCountries: 'All Countries',
      china: 'China',
      india: 'India',
      vietnam: 'Vietnam',
      turkey: 'Turkey',
      moq: 'Minimum Order Quantity (MOQ)',
      moqRange: 'MOQ Range',
      certifications: 'Certifications',
      manufacturingType: 'Manufacturing Type',
      oem: 'OEM - Original Equipment Manufacturer',
      odm: 'ODM - Original Design Manufacturer',
      privateLabel: 'Private Label',
      resetFilters: 'Reset Filters',
      minMoq: 'From',
      maxMoq: 'To',
      dollars: 'USD',
    },
    zh: {
      filters: '筛选',
      country: '工厂国家',
      allCountries: '所有国家',
      china: '中国',
      india: '印度',
      vietnam: '越南',
      turkey: '土耳其',
      moq: '最小起订量',
      moqRange: 'MOQ范围',
      certifications: '认证',
      manufacturingType: '制造类型',
      oem: 'OEM - 代工生产',
      odm: 'ODM - 设计制造',
      privateLabel: '贴牌生产',
      resetFilters: '重置',
      minMoq: '从',
      maxMoq: '到',
      dollars: '美元',
    },
  };

  const c = content[language];

  const certificationOptions = [
    { id: 'ISO 9001', label: 'ISO 9001' },
    { id: 'CE', label: 'CE' },
    { id: 'FDA', label: 'FDA' },
    { id: 'RoHS', label: 'RoHS' },
    { id: 'FCC', label: 'FCC' },
    { id: 'OEKO-TEX', label: 'OEKO-TEX' },
    { id: 'BSCI', label: 'BSCI' },
    { id: 'EN71', label: 'EN71' },
  ];

  const manufacturingTypeOptions = [
    { id: 'OEM', label: c.oem },
    { id: 'ODM', label: c.odm },
    { id: 'Private Label', label: c.privateLabel },
  ];

  const handleCountryChange = (value: string) => {
    onFiltersChange({ ...filters, country: value });
  };

  const handleMoqChange = (value: number[]) => {
    onFiltersChange({ ...filters, moqRange: [value[0], value[1]] as [number, number] });
  };

  const handleCertificationToggle = (certId: string) => {
    const newCerts = filters.certifications.includes(certId)
      ? filters.certifications.filter(c => c !== certId)
      : [...filters.certifications, certId];
    onFiltersChange({ ...filters, certifications: newCerts });
  };

  const handleManufacturingTypeToggle = (typeId: string) => {
    const newTypes = filters.manufacturingTypes.includes(typeId)
      ? filters.manufacturingTypes.filter(t => t !== typeId)
      : [...filters.manufacturingTypes, typeId];
    onFiltersChange({ ...filters, manufacturingTypes: newTypes });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-bold">{c.filters}</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs h-8">
            <X className="w-3 h-3 ml-1" />
            {c.resetFilters}
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['country', 'moq', 'certifications', 'manufacturing']} className="space-y-2">
        {/* Country Filter */}
        <AccordionItem value="country" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3 px-0">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{c.country}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <Select value={filters.country} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder={c.allCountries} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">{c.allCountries}</SelectItem>
                <SelectItem value="China">{c.china}</SelectItem>
                <SelectItem value="India">{c.india}</SelectItem>
                <SelectItem value="Vietnam">{c.vietnam}</SelectItem>
                <SelectItem value="Turkey">{c.turkey}</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* MOQ Filter */}
        <AccordionItem value="moq" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3 px-0">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{c.moq}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-4">
              <Slider
                value={filters.moqRange}
                onValueChange={handleMoqChange}
                min={0}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {c.minMoq}: <span className="font-medium text-foreground">${filters.moqRange[0].toLocaleString()}</span>
                </span>
                <span className="text-muted-foreground">
                  {c.maxMoq}: <span className="font-medium text-foreground">${filters.moqRange[1].toLocaleString()}</span>
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Certifications Filter */}
        <AccordionItem value="certifications" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3 px-0">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{c.certifications}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {certificationOptions.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`cert-${cert.id}`}
                    checked={filters.certifications.includes(cert.id)}
                    onCheckedChange={() => handleCertificationToggle(cert.id)}
                  />
                  <Label htmlFor={`cert-${cert.id}`} className="text-sm cursor-pointer">
                    {cert.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Manufacturing Type Filter */}
        <AccordionItem value="manufacturing" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3 px-0">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{c.manufacturingType}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {manufacturingTypeOptions.map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type.id}`}
                    checked={filters.manufacturingTypes.includes(type.id)}
                    onCheckedChange={() => handleManufacturingTypeToggle(type.id)}
                  />
                  <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default B2BFilters;
