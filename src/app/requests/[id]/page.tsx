import AppLayout from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { bids, serviceProviders, serviceRequests } from "@/lib/data";
import { notFound } from "next/navigation";
import { DollarSign, Calendar, MapPin, ShieldCheck, Clock, CheckCircle, Hourglass, CreditCard, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

function EscrowStatus({ status, escrowStatus }: { status: string, escrowStatus: string }) {
    if (status === 'Completed') {
        return (
            <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                    <p className="font-semibold">Job Completed</p>
                    <p className="text-sm text-muted-foreground">Payment Released</p>
                </div>
            </div>
        );
    }
    
    if (escrowStatus === 'Funded') {
        return (
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <div>
                    <p className="font-semibold">Payment Secured</p>
                    <p className="text-sm text-muted-foreground">Funds are held in escrow.</p>
                </div>
            </div>
        );
    }
    
    if (escrowStatus === 'Unfunded') {
        return (
            <div className="flex items-center gap-2">
                <Hourglass className="h-5 w-5 text-yellow-500" />
                <div>
                    <p className="font-semibold">Awaiting Deposit</p>
                    <p className="text-sm text-muted-foreground">Fund escrow to begin work.</p>
                </div>
            </div>
        );
    }

    return null;
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
    const request = serviceRequests.find((r) => r.id === params.id);
    if (!request) {
        notFound();
    }

    const requestBids = bids.filter((b) => b.requestId === request.id).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return (
        <AppLayout>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant={request.status === 'Open' ? 'default' : 'secondary'} className="mb-2">{request.status}</Badge>
                                    <CardTitle className="font-headline text-2xl">{request.title}</CardTitle>
                                    <CardDescription>Posted by {request.postedBy}</CardDescription>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">${request.budget}</p>
                                    <p className="text-sm text-muted-foreground">Budget</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{request.description}</p>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{request.urgency}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bids from Providers</CardTitle>
                            <CardDescription>
                                {requestBids.length > 0 ? `${requestBids.length} providers have bid on this request.` : 'Be the first to bid on this request!'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {requestBids.map(bid => {
                                const provider = serviceProviders.find(p => p.id === bid.providerId);
                                if (!provider) return null;
                                return (
                                    <div key={bid.id} className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src={provider.avatarUrl} alt={provider.name} />
                                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <Link href={`/providers/${provider.id}`} className="font-semibold hover:underline">{provider.name}</Link>
                                                    <p className="text-sm text-muted-foreground">{provider.service}</p>
                                                </div>
                                                <p className="font-bold text-lg">${bid.amount}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-3 rounded-lg">{bid.message}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatDistanceToNow(bid.timestamp, { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Escrow Payment</CardTitle>
                            <CardDescription>Secure your payment until the job is done.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <EscrowStatus status={request.status} escrowStatus={request.escrowStatus} />
                        </CardContent>
                        {request.escrowStatus === 'Unfunded' && request.status !== 'Completed' && (
                             <CardFooter>
                                <Button className="w-full">
                                    <CreditCard className="mr-2 h-4 w-4" /> Deposit ${request.budget} to Escrow
                                </Button>
                            </CardFooter>
                        )}
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Place Your Bid</CardTitle>
                            <CardDescription>Are you a provider? Win this job.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label htmlFor="bid-amount">Your Bid Amount ($)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="bid-amount" type="number" placeholder="140" className="pl-10" />
                                </div>
                             </div>
                             <div>
                                <Label htmlFor="bid-message">Message to Customer</Label>
                                <Textarea id="bid-message" placeholder="Explain why you're the best fit for this job..." />
                             </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Send className="mr-2 h-4 w-4" /> Submit Bid
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
