import AppLayout from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceProviders } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Shield, MessageCircle, Award, Briefcase } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ProviderProfilePage({ params }: { params: { id: string } }) {
    const provider = serviceProviders.find((p) => p.id === params.id);
    if (!provider) {
        notFound();
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                <Card className="overflow-hidden">
                    <div className="bg-muted/30 p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                <AvatarImage src={provider.avatarUrl} alt={provider.name} />
                                <AvatarFallback className="text-4xl">{provider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold font-headline">{provider.name}</h1>
                                <p className="text-lg text-primary">{provider.service}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">{provider.rating}</span>
                                        <span>({provider.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Shield className="w-5 h-5 text-accent" />
                                        <span className="font-semibold">{provider.reputationScore}</span>
                                        <span>Reputation</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:ml-auto">
                                <Button size="lg">
                                    <MessageCircle className="mr-2 h-4 w-4" /> Request a Quote
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Briefcase className="text-primary"/> Portfolio</CardTitle>
                                <CardDescription>A showcase of recent work.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {provider.portfolio.length > 0 ? provider.portfolio.map((item, index) => (
                                    <div key={index} className="p-4 border rounded-lg bg-muted/20">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                )) : <p className="text-muted-foreground text-sm">No portfolio items yet.</p>}
                            </CardContent>
                        </Card>

                        {provider.galleryUrls.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Photo Gallery</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Carousel opts={{ loop: true }} className="w-full">
                                        <CarouselContent>
                                            {provider.galleryUrls.map((url, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="aspect-video relative overflow-hidden rounded-lg">
                                                        <Image
                                                            src={url}
                                                            alt={`Gallery image ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            data-ai-hint="work example"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="ml-12" />
                                        <CarouselNext className="mr-12" />
                                    </Carousel>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Award className="text-primary"/> Badges & Verifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Badge variant="secondary" className="w-full justify-start gap-2 p-2 text-base">
                                    <ShieldCheck className="h-5 w-5 text-green-500" /> Verified Pro
                                </Badge>
                                <Badge variant="secondary" className="w-full justify-start gap-2 p-2 text-base">
                                    <CheckCircle className="h-5 w-5 text-green-500" /> Background Checked
                                </Badge>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Customer Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* This would be a list of reviews */}
                                <div className="text-center text-muted-foreground text-sm p-4 border-2 border-dashed rounded-lg">
                                    <p>Reviews will be displayed here.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
