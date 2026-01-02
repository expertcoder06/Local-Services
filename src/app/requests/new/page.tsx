'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/components/AppLayout';
import { getBidSuggestions } from '@/app/actions';
import { Wand2, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  serviceDescription: z.string().min(20, 'Please provide a more detailed description (at least 20 characters).'),
  budget: z.coerce.number().positive('Budget must be a positive number.'),
  urgency: z.enum(['ASAP', 'Within a week', 'Flexible']),
  location: z.string().min(2, 'Location is required.'),
  customerRequirements: z.string().optional(),
});

export default function NewRequestPage() {
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [bidSuggestions, setBidSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceDescription: '',
      budget: 100,
      urgency: 'Within a week',
      location: 'New York, NY',
      customerRequirements: '',
    },
  });

  async function handleGenerateSuggestions() {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        variant: 'destructive',
        title: 'Form is invalid',
        description: 'Please fill out the form correctly before generating suggestions.',
      });
      return;
    }

    setLoadingSuggestions(true);
    setBidSuggestions([]);
    const values = form.getValues();
    const result = await getBidSuggestions(values);
    setLoadingSuggestions(false);

    if (result.success && result.bids) {
      setBidSuggestions(result.bids);
      toast({
        title: 'Suggestions generated!',
        description: 'AI has suggested some competitive bids for your request.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not generate suggestions.',
      });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate posting the request
    console.log(values);
    toast({
        title: "Request Posted!",
        description: "Your service request is now live for providers to bid on.",
    });
    router.push('/dashboard');
  }

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Post a Service Request</CardTitle>
              <CardDescription>Describe the service you need and get bids from local pros.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="serviceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., I need a leaky pipe under my kitchen sink fixed..." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Budget (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="150" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ASAP">ASAP</SelectItem>
                              <SelectItem value="Within a week">Within a week</SelectItem>
                              <SelectItem value="Flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Downtown, Los Angeles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Requirements (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Must be available on weekends, need a quote first..." {...field} />
                        </FormControl>
                        <FormDescription>Any other details providers should know.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button type="button" variant="outline" onClick={handleGenerateSuggestions} disabled={loadingSuggestions}>
                      {loadingSuggestions ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Generate Bid Suggestions
                    </Button>
                    <Button type="submit" disabled={loadingSuggestions}>Post Request</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Wand2 className="text-accent" />
                AI-Powered Bid Suggestions
              </CardTitle>
              <CardDescription>
                Use our AI to find the sweet spot for your budget to attract quality pros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSuggestions ? (
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating competitive bids...</p>
                    </div>
                </div>
              ) : bidSuggestions.length > 0 ? (
                <div className="space-y-3">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Here are some suggestions!</AlertTitle>
                    <AlertDescription>
                        Based on your request, these bids are likely to attract good service providers. You can update your budget based on these.
                    </AlertDescription>
                  </Alert>
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 pt-2">
                    {bidSuggestions.map((bid, index) => (
                      <li key={index}>
                        <Button variant="outline" className="w-full" onClick={() => form.setValue('budget', parseFloat(bid.replace('$', '')))}>
                          {bid}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                 <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>Fill out the form and click "Generate Bid Suggestions" to see what our AI recommends.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
