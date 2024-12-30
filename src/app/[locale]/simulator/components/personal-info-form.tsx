'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SimulatorFormProps, formSchema, PRODUCT_TYPES } from '../types'
import { useEffect } from 'react'

import { User, Mail, Phone, DollarSign, Briefcase, Calendar, Shield, PiggyBank, PlayCircle, RefreshCw } from 'lucide-react'

export function PersonalInfoForm({ onSimulationComplete, onValidationError }: SimulatorFormProps) {
    const t = useTranslations('SimulatorForm')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            monthlyIncome: 0,
            otherIncome: 0,
            requestedAmount: 0,
            productType: 'personal',
            term: 12,
            includeInsurance: false,
            initialContribution: 0,
            currency: 'MZN',
        },
    })

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => console.log(value, name, type))
        return () => subscription.unsubscribe()
    }, [form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSimulationComplete(values)
    }

    function resetForm() {
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onValidationError)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('fullName')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input placeholder={t('fullNamePlaceholder')} {...field} className="pl-10" />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('email')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="email" placeholder={t('emailPlaceholder')} {...field} className="pl-10" />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('phoneNumber')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="tel" placeholder={t('phoneNumberPlaceholder')} {...field} className="pl-10" />
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('monthlyIncome')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="pl-10" />
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="otherIncome"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('otherIncome')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="pl-10" />
                                    <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="requestedAmount"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('requestedAmount')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="pl-10" />
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('productType')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder={t('selectProductType')} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PRODUCT_TYPES.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {t(type.value)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('term')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="pl-10" />
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="includeInsurance"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                                <Shield className="text-gray-400" size={18} />
                                <div>
                                    <FormLabel className="text-base">{t('includeInsurance')}</FormLabel>
                                    <FormDescription>
                                        {t('includeInsuranceDescription')}
                                    </FormDescription>
                                </div>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="initialContribution"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-4">
                            <FormLabel className="w-1/3">{t('initialContribution')}</FormLabel>
                            <FormControl className="w-2/3">
                                <div className="relative">
                                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="pl-10" />
                                    <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <Button type="submit" className="flex items-center space-x-2">
                        <PlayCircle size={18} />
                        <span>{t('simulate')}</span>
                    </Button>
                    <Button type="button" onClick={resetForm} variant="outline" className="flex items-center space-x-2">
                        <RefreshCw size={18} />
                        <span>{t('reset')}</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
