'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { serviceProviders, ServiceProvider } from '@/lib/data';
import AppLayout from '@/components/AppLayout';
import { MapPin, Star, Shield, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nearbyProviders, setNearbyProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      setNearbyProviders(serviceProviders.slice(0, 4)); // Fallback to showing some providers
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Simulate finding nearby providers within 5-10km
        // In a real app, this would be an API call
        const providers = serviceProviders.filter(p => {
            const dist = getDistance(latitude, longitude, p.location.lat, p.location.lng);
            return dist < 10; // 10km radius
        });
        setNearbyProviders(providers);
        setLoading(false);
      },
      () => {
        setError('Unable to retrieve your location. Showing default providers.');
        setLoading(false);
        setNearbyProviders(serviceProviders.slice(0, 4)); // Fallback
      }
    );
  }, []);

  // Haversine formula to calculate distance
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180)
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">Services Near You</h1>
            <p className="text-muted-foreground">
                {error ? error : location ? 'Providers available in your area.' : 'Getting your location...'}
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <Card className="lg:col-span-7 xl:col-span-8">
            <CardHeader>
                <CardTitle>Nearby Providers</CardTitle>
                <CardDescription>
                    {loading ? 'Finding providers...' : `Found ${nearbyProviders.length} providers within 10km.`}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-4/5" />
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Skeleton className="h-8 w-24" />
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    nearbyProviders.map(provider => (
                        <Card key={provider.id} className="overflow-hidden flex flex-col">
                            <CardHeader className="flex flex-row items-start gap-4 p-4 bg-muted/20">
                                <Image
                                    src={provider.avatarUrl}
                                    alt={`Avatar of ${provider.name}`}
                                    width={64}
                                    height={64}
                                    className="rounded-full border-2 border-background shadow-sm"
                                    data-ai-hint="person portrait"
                                />
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-headline">{provider.name}</CardTitle>
                                    <CardDescription>{provider.service}</CardDescription>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span>{provider.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Shield className="w-4 h-4 text-accent" />
                                            <span>{provider.reputationScore}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    Specializing in all things {provider.service.toLowerCase()}. {provider.reviews}+ happy customers.
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button asChild size="sm" className="w-full">
                                    <Link href={`/providers/${provider.id}`}>
                                        View Profile <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>

        <Card className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <CardHeader>
                <CardTitle>Map View</CardTitle>
                <CardDescription>Visual map of provider locations</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="h-full min-h-[300px] rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground p-4">
                        <MapPin className="mx-auto h-12 w-12 mb-2" />
                        <p className="font-semibold">Map integration coming soon</p>
                        <p className="text-sm">This will show a live map of providers near you.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
